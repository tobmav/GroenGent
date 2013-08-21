<?php

class AccountController extends Zend_Controller_Action
{
    protected $_auth = null;

    public function init()
    {
        $this->_auth = Zend_Auth::getInstance();
    }

    public function loginAction()
    {
        $form = new Application_Form_Login();

        $view = $this->view;
        $view->title = 'Aanmelden';

        $request = $this->getRequest();

        if ($request->isPost() ) {
            if ($form->isValid( $request->getPost() )) {
                $values = $form->getValues();
                $user = new Application_Model_User($values);
                
                $adapter = new statGhent_Auth_Adapter_User( $user->getUsername(),
                                                            $user->getPassword());
                                                            
                $this->_auth->authenticate($adapter);

                if ($this->_auth->hasIdentity() ) {
                    $user_data = $adapter->getResultRowObject();

                    $this->_auth->getStorage()->write(array('role' => statGhent_Acl::ROLE_USER,
                                                            'id'   => (int) $user_data->user_id,
                                              ));
                    return $this->redirect('profile/index');
                } else {
                    $view->assign('error',$form->isErrors());
                    //return $this->redirect('error/');
                }
            }
        }
        $view->form = $form;
    }

    public function registerAction()
    {
        $form = new Application_Form_Register();

        $view = $this->view;
        $view->title = 'Register';

        $request = $this->getRequest();

        if ($request->isPost() ) {
            
            //$values = $form->getValues();
            //$form->populate($values);
            $val = $request->getPost();
            
                if ($form->isValid($val)) {
                $user = new Application_Model_User();
                $user->setUsername($val["username"]);
                $user->setPasswordraw($val["passwordraw"]);
                $user->setFirstname($val["firstname"]);
                $user->setSurname($val["surname"]);
                $user->setEmail($val["email"]);
                $user->setSex($val["sex"]);
                $user->setDescription($val["description"]);
                $user->setWebsite($val["website"]);
                $createdd = new DateTime('now', new DateTimeZone('UTC'));
                $createdd = $createdd->format('Y-m-d H:i:s');
                $user->setCreateddate( $createdd );
                $user->setActivationkey(statGhent_Utility::randomString(64) );
              
                if($form->image->isUploaded())
                {
                    //$image = new Application_Model_Image();
                    $name = $form->image->getFileName(null,false);
                    
                    $mime = $form->image->getMimeType();
                    
                    $image->setMimetype($mime);
                    $image->setImage($name);
                    $exts = explode('/', $mime);
                    $ext = end($exts);
                    
                    $new_image_name = $user->getUsername(). '.' . $ext;     
                    
                    //NOT WORKING WHEN ONLY RENAME FILTER... NEITHER IS NOW
                    $form->image->addFilter('Rename',$new_image_name, true);
                    
                    try {
                        
                        if ($form->image->receive()) {
                            $imMapper = new Application_Model_ImageMapper();
                            $imid = $imMapper->save($image);
                            
                            $user->setImage($imid);
                            $uMapper = new Application_Model_UserMapper();
                            $uid = $uMapper->save($user);
                            $user->setId($uid);
                            $config = array('auth' => 'login',
                                            'username' => 'GroenGhent@gmail.com',
                                            'password' => 'GroenGhent1990',
                                            'ssl' => 'tls');

                            $transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', $config);
                                                        
                            $html = "<table style='width:60%; margin-left:5%'>

                                            <tr>
                                                    <th colspan='5' height='100px;' style='border-bottom:1px solid #3a3a3a;'>ACTIVATION MAIL GROENGENT</th>

                                            </tr>
                                            <tr style='height:80px;'>

                                                <td colspan='5' style='font:Verdana, Geneva, sans-serif; font-weight:bold;font-size:24px;'>Welkom " . $user->getUsername() . " bij GroenGent!</td>
                                            </tr>
                                            <tr style='height:40px;'>

                                                <td colspan='5'><a href='http://localhost/GroenGent/public/account/activate?id=". $user->getId() ."&key=". $user->getActivationkey() ."' style='color:#3e3e3e; text-decoration:underline;'>Activate your account now!</a></td>
                                            </tr>
                                            <tr>

                                                <td colspan='5'>Link not working? Try copying this link into your browser:</td>
                                            </tr>
                                            <tr>

                                                <td colspan='5'>http://localhost/GroenGent/public/account/activate?id=". $user->getId() ."&key=". $user->getActivationkey()."</td>
                                            </tr>
                                            </table>
                            ";
                            
                            $mail = new Zend_Mail();
                            $mail->setBodyHtml($html);
                            $mail->setFrom('GroenGent@gmail.com');
                            $mail->addTo($user->getEmail());
                            $mail->setSubject('GroenGent | Activationlink');
                            $mail->send($transport);
                            return $this->redirect('account/login');
                        }
                        else {
                            throw new Zend_Exception("Afbeelding niet geupload of mail kapoet.");
                       }
                        
                    } catch (Zend_File_Transfer_Exception $e) {
                        throw new Zend_Exception("Afbeelding onjuist geupload.");
                    }
                }
                else {
                     //throw new Zend_Exception("file not provided");
                    $uMapper = new Application_Model_UserMapper();
                    
                    $uid = $uMapper->save($user);
                    $user->setId($uid);
                            $config = array('auth' => 'login',
                                            'username' => 'GroenGent@gmail.com',
                                            'password' => 'GroenGent1990',
                                            'ssl' => 'ssl',
                                            'port' => '465');
                            // tls 587

                            $transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', $config);
                                                        
                            $html = "<table style='width:60%; margin-left:5%'>

                                            <tr>
                                                    <th colspan='5' height='100px;' style='border-bottom:1px solid #3a3a3a;'>Activatiemail GroenGent</th>

                                            </tr>
                                            <tr style='height:80px;'>

                                                <td colspan='5' style='font:Verdana, Geneva, sans-serif; font-weight:bold;font-size:24px;'>Welcome " . $user->getUsername() . " bij GroenGent!</td>
                                            </tr>
                                            <tr style='height:40px;'>

                                                <td colspan='5'><a href='http://localhost/GroenGent/public/account/activate?id=". $user->getId() ."&key=". $user->getActivationkey() ."' style='color:#3e3e3e; text-decoration:underline;'>Activeer je account via deze link:</a></td>
                                            </tr>
                                            <tr>

                                                <td colspan='5'>Werkt deze link niet? Kopieer hem naar je adresbalk.</td>
                                            </tr>
                                            <tr>

                                                <td colspan='5'>http://localhost/GroenGent/public/account/activate?id=". $user->getId() ."&key=". $user->getActivationkey()."</td>
                                            </tr>
                                            </table>
                            ";
                            
                            $mail = new Zend_Mail();
                            $mail->setBodyHtml($html);
                            $mail->setFrom('GroenGent@gmail.com');
                            $mail->addTo($user->getEmail());
                            $mail->setSubject('GroenGent | Activatielink');
                            $mail->send($transport);
                            
                            return $this->redirect('account/login');
                }
                
            }
            else { 
                print_r($val);
            }
        }
        $view->form = $form;
    }

    public function activateAction()
    {
        $request = $this->getRequest();

        if ($request->isGet() ) {
            $val = $this->getRequest();
            //Zend_Debug::dump($_GET['id'] . $_GET['key']);exit();
            $id = $_GET['id'];
            $key = $_GET['key'];
            $userM = new Application_Model_UserMapper();
            try {
                $user = new Application_Model_User($userM->read($id));
               // Zend_Debug::dump($user);exit();
               if ($user->getActivationkey() == $key) {
                    //Zend_Debug::dump('jes');die();
                    $activationdate = new DateTime('now', new DateTimeZone('UTC'));
                    $activationdate = $activationdate->format('Y-m-d H:i:s');
                    $user->setActivationdate($activationdate);
                    $modifieddate = new DateTime('now', new DateTimeZone('UTC'));
                    $modifieddate = $modifieddate->format('Y-m-d H:i:s');
                    $user->setModifieddate($modifieddate);
                    $userM->save($user);
                    return $this->redirect('account/login');
                   
               }  else {
                   throw new Zend_Exception('De meegegeven sleutel is ongeldig, neem contact op met de administrator.');

               }
            }
            catch (Exception $e)
            {
                throw new Zend_Exception($e);
            }
        }
    }

    public function forgotpasswordAction()
    {
        $form = new Application_Form_Forgotpassword();
        $view = $this->view;
        $view->title = 'Forgot Password';

        $request = $this->getRequest();

        if ($request->isPost() ) {
            if ($form->isValid( $request->getPost() )) {
                $values = $form->getValues();
                
                $userM = new Application_Model_UserMapper();
                Zend_Debug::dump($values);
                $user = new Application_Model_User($userM->readWithvalue('user_email', $values["email"]));
                if ($user->getUsername() == $values["username"]) {
                    $pass = statGhent_Utility::randomString(6);
                    $user->setPasswordraw($pass);
                    
                    $modifieddate = new DateTime('now', new DateTimeZone('UTC'));
                    $modifieddate = $createdd->format('Y-m-d H:i:s');
                    $user->setModifieddate($modifieddate);
                    
                    $userM->save($user);
                    
                    $config = array('auth' => 'login',
                                            'username' => 'GroenGent@gmail.com',
                                            'password' => 'GroenGent1990',
                                            'ssl' => 'tls');

                            $transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', $config);
                                                        
                            $html = "<table style='width:60%; margin-left:5%'>

                                <tr>
                                        <th colspan='5' height='100px;' style='border-bottom:1px solid #3a3a3a;'>Wijziging wachtwoord GroenGent</th>

                                </tr>
                                <tr style='height:80px;'>

                                    <td colspan='5' style='font:Verdana, Geneva, sans-serif; font-weight:bold;font-size:24px;'>Hallo " . $user->getUsername() . "!</td>
                                </tr>
                                <tr style='height:40px;'>

                                    <td colspan='5'>Je nieuwe wachtwoord is <em>". $pass ."</em>.</td>
                                </tr>
                                <tr style='height:40px;'>

                                    <td colspan='5'>Je kan dit aanpassen op de profielpagina.</td>
                                </tr>
                                
                                </table>
                            ";
                            
                            $mail = new Zend_Mail();
                            $mail->setBodyHtml($html);
                            $mail->setFrom('GroenGent@gmail.com');
                            $mail->addTo($user->getEmail());
                            $mail->setSubject('GroenGent | Wachtwoord vergeten');
                            $mail->send($transport);
                            return $this->redirect('account/login');
                }
            }
        }
        $view->form = $form;
    }

    public function logoutAction()
    {
        $this->_auth->clearIdentity();

        return $this->redirect('index');
    }
}
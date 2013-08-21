<?php

class ProfileController extends Zend_Controller_Action
{
    protected $_auth = null;
    public function init()
    {
        $this->_auth = Zend_Auth::getInstance();
    }

    public function indexAction()
    {
        $auth = Zend_Auth::getInstance();
        $id = $auth->getStorage()->read()['id'];
        $userM = new Application_Model_UserMapper();
        $user = new Application_Model_User($userM->read($id));
        $view = $this->view;
        //Zend_Debug::dump($user);
        $view->assign('username',     $user->getUsername    ());
        $view->assign('firstname',    $user->getFirstname   ());
        $view->assign('surname',      $user->getSurname     ());
        $view->assign('email',        $user->getEmail       ());
        $view->assign('sex',          $user->getSex         ());
        $view->assign('description',  $user->getDescription ());
        $view->assign('website',      $user->getWebsite     ());
        
        $view->assign('path',APPLICATION_PATH);
    }

    public function editAction()
    {
        $form = new Application_Form_Register();
        $form->getElement("submit")       ->setLabel("Opslaan");
        $form->getElement("passwordraw")  ->clearValidators()->setAllowEmpty(true)->setRequired(false);
        $form->getElement("passwordcheck")->clearValidators()->setAllowEmpty(true)->setRequired(false);
        $form->removeElement('username');
        
        $view = $this->view;
        $view->title = 'Wijzig profiel';
        
        $auth = Zend_Auth::getInstance();
        $id = $auth->getStorage()->read()['id'];
        if($id >0)
        {
            $userM = new Application_Model_UserMapper();
            $user  = new Application_Model_User($userM->read($id));
           
            $users = array();
            
            $users['username']      = $user->getUsername();
            $users['firstname']     = $user->getFirstname();
            $users['surname']       = $user->getSurname();
            $users['sex']           = $user->getSex();
            $users['description']   = $user->getDescription();
            $users['website']       = $user->getWebsite();
            $users['email']         = $user->getEmail();
            
            //Zend_Debug::dump($users);
            $form->populate($users);
        }
        else {
            return $this->redirect('account/login/');
        }
        
        $request = $this->getRequest();

        if ($request->isPost() ) 
        {
        
            if ($form->isValid( $request->getPost() )) 
            {
               $values = $form->getValues();
                $form->populate($values);
                $val = $this->getRequest()->getPost();
                
                if ($form->isValid( $request->getPost() )) {
                    Zend_debug::dump($val);
                    if(isset($val["passwordraw"]))
                    {
                        $user->setPasswordraw($val["passwordraw"]);
                    }
                    $user->setFirstname($val["firstname"]);
                    $user->setSurname($val["surname"]);
                    $user->setEmail($val["email"]);
                    $user->setSex($val["sex"]);
                    $user->setDescription($val["description"]);
                    $user->setWebsite($val["website"]);
                    $modifiedd = new DateTime('now', new DateTimeZone('UTC'));
                    $modifiedd = $modifiedd->format('Y-m-d H:i:s');
                    $user->setModifieddate( $modifiedd );
                    
                    $uMapper = new Application_Model_UserMapper();
                    
                    $uid = $uMapper->save($user);
                    $user->setId($uid);
                    return $this->redirect('profile/index');
                }
            }
        }
        $view->form = $form;
    }
}
<?php

class Application_Form_Register extends Zend_Form
{

    public function init()
    {
        $decorators = array(
            'ViewHelper',
            array('Errors', array ('class' => 'help-inline')),
            array(
                array('inner' => 'HtmlTag'),
                array('tag'   => 'div',
                      'class' => 'controls',
                )
            ),
            array('Label',
                array('placement' => 'prepend',
                      'class'     => 'control-label',
                )
            ),
            array(
                array('outer' => 'HtmlTag'),
                array('tag'   => 'div',
                      'class' => 'control-group')),
        );
        
        $username = new Zend_Form_Element_Text('username');
        $username   
                     ->setRequired()
                     ->addFilter('StringTrim')
                     ->addValidator('NotEmpty', true)
                      ->setAttrib('id','login-username')
                      ->setAttrib('placeholder','Gebruikersnaam')
                      ->setAttrib('tabindex', '1')
                      ->setAttrib('autofocus', 'autofocus')
                ->setAttrib('class', 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c')
        ;
        
        $password = new Zend_Form_Element_Password('passwordraw');
        $password
                     ->setRequired()
                     ->addFilter('StringTrim')
                     ->addValidator('NotEmpty', true)
                      ->setAttrib('id','register-pwd')
                      ->setAttrib('placeholder','Wachtwoord')
                      ->setAttrib('tabindex', '2')
                ->setAttrib('class', 'ui-input-password ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c')
        ;
        
        $passwordcheck = new Zend_Form_Element_Password('passwordcheck');
        $passwordcheck
                     ->setRequired()
                     ->addFilter('StringTrim')
                     ->addValidator('NotEmpty', true)
                     ->addValidator('Identical', false, array('token' => 'passwordraw'))
                      ->setAttrib('id','register-pwdRpt')
                      ->setAttrib('placeholder','Herhaal wachtwoord')
                      ->setAttrib('tabindex', '3')
                ->setAttrib('class', 'ui-input-password ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c')
                
                
        ;
        
        $firstname = new Zend_Form_Element_Text('firstname');
        $firstname  
                     ->setRequired()
                     ->addFilter('StringTrim')
                     ->addValidator('NotEmpty', true)
                      ->setAttrib('id','register-fname')
                      ->setAttrib('placeholder','Voornaam')
                      ->setAttrib('tabindex', '4')
                                ->setAttrib('class', 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c')

        ;
        
        $surname = new Zend_Form_Element_Text('surname');
        $surname   
                     ->setRequired()
                     ->addFilter('StringTrim')
                     ->addValidator('NotEmpty', true)
                
                      ->setAttrib('id','register-fname')
                      ->setAttrib('placeholder','Naam')
                      ->setAttrib('tabindex', '5')
                                ->setAttrib('class', 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c')
        ;
        
        $email = new Zend_Form_Element_Text('email');
        $email 
                     ->setRequired()
                     ->addFilter('StringTrim')
                     ->addValidator('NotEmpty', true)
                      ->setAttrib('id','register-email')
                      ->setAttrib('placeholder','E-mail')
                      ->setAttrib('tabindex', '6')
                                ->setAttrib('class', 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c')
        ;
        
        $sex = new Zend_Form_Element_Radio('sex');
        $sex      ->setLabel('Geslacht')
                    ->addMultiOptions(array(
                        'm' => 'Man',
                        'f' => 'Vrouw',
                    ))
                     ->setRequired()
                      ->setAttrib('tabindex', '7')
        ;
        
        $description = new Zend_Form_Element_Textarea('description');
        $description    ->setValue("Beschrijf jezelf kort (optioneel).")
                      ->setAttrib('id','textarea-a')
                      ->setAttrib('tabindex', '8')
                                ->setAttrib('class', 'ui-input-text ui-body-c ui-corner-all ui-shadow-inset')
        ;
        
        $website = new Zend_Form_Element_Text('website');
        $website     
                     ->addFilter('StringTrim')
                      ->setAttrib('id','register-website')
                      ->setAttrib('placeholder','Website')
                      ->setAttrib('tabindex', '9')
                                ->setAttrib('class', 'ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c')
        ;
        
        /*Zend_Debug::dump(is_dir(APPLICATION_PATH . "/../public/images/"));
        exit();*/
        
        $image = new Zend_Form_Element_File('image');
        $image       ->setLabel('Avatar (Max 500Kb, png of jpeg)')
                     ->setDestination(APPLICATION_PATH . "/../public/images/")
                     ->addValidator('IsImage')
                     ->addValidator('Mimetype', false, 'image/jpg')
                     ->addValidator('Size', false, 512000)
                     ->setMaxFileSize(512000)
                      ->setAttrib('tabindex', '10')
                
        ;

        $submit = new Zend_Form_Element_Submit('submit');
        $submit->setLabel('Registreer')
               ->setOptions(array('class' => 'btn btn-success'))
               ->setAttrib('id', 'register-btn')
                      ->setAttrib('tabindex', '11')
               ;

        $view = Zend_Layout::getMvcInstance()->getView();
        
        $this->setOptions(array('id' => 'view-register'))
             ->setEnctype(Zend_Form::ENCTYPE_MULTIPART)
             ->setDecorators(array('FormElements', 'Form'))
             ->setMethod('post')
             ->setAction('')
             ->addElement($username)
             ->addElement($password )
             ->addElement($passwordcheck )
             ->addElement($firstname )
             ->addElement($surname )
             ->addElement($email )
             ->addElement($sex )
             ->addElement($description )
             ->addElement($website )
             ->addElement($image )
             ->addElement($submit )
        ;
    }

    /**
     * @param mixed $data Form data.
     * @return boolean
     */
   public function isValid($data)
    {
        $valid = parent::isValid($data);

        foreach ($this->getElements() as $element) {
            if ($element->hasErrors()) {

                $decorator = $element->getDecorator('outer');
                if($decorator != NULL)
                {
                    $options = $decorator->getOptions();
                $options['class'] .= ' error';

                $decorator->setOptions($options);
                }
                
            }
        }

        return $valid;
    }
}
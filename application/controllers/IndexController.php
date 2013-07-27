<?php

class IndexController extends Zend_Controller_Action
{
    protected $_auth = null;
    public function init()
    {
        $this->_auth = Zend_Auth::getInstance();
        //Zend_Debug::dump(statGhent_Utility::hash('test', 'sha1'));die(); 
    }

    public function indexAction()
    {
        $view = $this->view;
        $auth = Zend_Auth::getInstance();
        $id = $auth->getStorage()->read()['id'];
        $userM = new Application_Model_UserMapper();
        try {   
            if($user = new Application_Model_User($userM->read($id)))
            {
                $view->assign('loggedin',1);
                $view->assign('username',$user->getUsername());
            }
        }
        catch (Exception $e)
        {
            $view->assign('loggedin',0);
        }
        
        
        
    }


}


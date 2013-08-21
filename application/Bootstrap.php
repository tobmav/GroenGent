<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    public function _initViewHelpers()
    {
        $this->bootstrap('layout'); 
        $view = $this->getResource('layout')->getView();

        $front = $this->getResource('frontController');
        $front->setRequest(new Zend_Controller_Request_Http());

        // Doc definition
        $view->doctype('HTML5'); 
        $view->headMeta()
             ->setCharset('utf-8')
             ->appendName('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
        ;

        $view->headTitle($view->title, 'PREPEND')
             ->setDefaultAttachOrder('PREPEND')
             ->setSeparator(' | ')
        ;

        $view->headLink() 
             // Reset
             ->appendStylesheet($view->baseUrl('_styles/css/_libs/reset/reset.css'), 'all')
             
             // Custom CSS
             ->appendStylesheet($view->baseUrl('_styles/css/common.css'), 'all and (min-width: 1024px)')
             ->appendStylesheet($view->baseUrl('_styles/css/main.css'), 'all and (min-width: 1024px)')
             ->appendStylesheet($view->baseUrl('_styles/css/mobile.css'), 'all and (min-width: 0px) and (max-width: 1023px)')
                
             // Nivo slider
             ->appendStylesheet($view->baseUrl('_styles/css/_libs/nivo/default.css'), 'all and (min-width: 1024px)')
             ->appendStylesheet($view->baseUrl('_styles/css/_libs/nivo/light.css'), 'all and (min-width: 1024px)')
             ->appendStylesheet($view->baseUrl('_styles/css/_libs/nivo/dark.css'), 'all and (min-width: 1024px)')
             ->appendStylesheet($view->baseUrl('_styles/css/_libs/nivo/default.css'), 'all and (min-width: 1024px)')
             ->appendStylesheet($view->baseUrl('_styles/css/_libs/nivo/nivo-slider.css'), 'all and (min-width: 1024px)')
             ->appendStylesheet($view->baseUrl('_styles/css/_libs/nivo/style.css'), 'all and (min-width: 1024px)')
                
             // Bootstrap
             ->appendStylesheet($view->baseUrl('_styles/css/_libs/bootstrap/bootstrap.min.css'), 'all and (min-width: 1023px)')
                
             // jQuery Mobile
             ->appendStylesheet('http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css', 'all and (min-width: 0px) and (max-width: 1023px)')
                
             // Google Webfonts
             ->appendStylesheet("http://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'")
             
        ;
        $view->headScript()
                // Modernizr
                ->appendFile($view->baseUrl('_scripts/_libs/modernizr/modernizr-2.6.2.min.js'));
       

        $view->inlineScript()
             // jQuery
             ->appendFile('http://code.jquery.com/jquery-latest.js')
                
             // Bootstrap
             ->appendFile($view->baseUrl('_scripts/_libs/bootstrap/bootstrap.min.js'), 'all and (min-width: 1024px)')
                
             // jQuery Mobile
             ->appendFile('http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js')
             
             // Nivo slider 
             ->appendFile($view->baseUrl('_scripts/_libs/nivo/jquery.nivo.slider.js'))
             ->appendFile($view->baseUrl('_scripts/_libs/nivo/jquery.nivo.slider.pack.js'))
                
             // Custom Javascript
             ->appendFile($view->baseUrl('_scripts/js/geolocation.js'))
             ->appendFile($view->baseUrl('_scripts/js/GroenGent.js'))
             ->appendFile($view->baseUrl('_scripts/js/loadData.js'))
        ;
    }
}
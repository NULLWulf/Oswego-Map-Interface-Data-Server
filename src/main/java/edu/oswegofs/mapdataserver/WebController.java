package edu.oswegofs.mapdataserver;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class WebController {

    @RequestMapping("/")
    public ModelAndView serveMainPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index.html");
        System.out.println("----- Setting Mapview -----");
        return modelAndView;
    }
}

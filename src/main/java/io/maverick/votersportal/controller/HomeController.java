package io.maverick.votersportal.controller;

import io.maverick.votersportal.model.Voter;
import io.maverick.votersportal.repository.VoterRepo;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.MessageDigest;


@Controller
public class HomeController {
    @Autowired
    VoterRepo repo;
    @GetMapping({"/","/home"})
    public String home()
    {
        return "home";
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public void login(String hash, HttpServletRequest request, HttpServletResponse response)
    {
        Voter voter=repo.findVoter(hash);
        if(voter!=null)
        {
             HttpSession session=request.getSession();
             session.setAttribute("user_hash",hash);
            try {
                response.sendRedirect("/vote");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        else
        {
            try {
                request.getRequestDispatcher("/home").forward(request,response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @GetMapping("/vote")
    public ModelAndView performVoting(HttpServletRequest request)
    {
        HttpSession session=request.getSession();
        ModelAndView modelAndView=new ModelAndView();
        if(session.getAttribute("user_hash")!=null)
        {
            Voter voter=repo.findVoter((String)session.getAttribute("user_hash") );
            modelAndView.setViewName("vote");
            modelAndView.addObject("voter_detail",voter);
            return  modelAndView;
        }
        modelAndView.setViewName("home");
        return modelAndView;
    }
}

package io.maverick.votersportal.controller;

import io.maverick.votersportal.repository.VoterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.web3j.protocol.Web3j;


@Controller
public class HomeController {
    @Autowired
    VoterRepo repo;
    @GetMapping({"/","/home"})
    public String home()
    {
        return "home";
    }
}

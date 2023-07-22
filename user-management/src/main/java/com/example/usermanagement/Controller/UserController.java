package com.example.usermanagement.Controller;

import java.util.List;
import java.util.Optional;

import com.example.usermanagement.Data.User;
import com.example.usermanagement.Data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepo;

    // Save method is predefine method in Mongo Repository
    // with this method we will save user in our database
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return userRepo.save(user);
    }

    // findAll method is predefine method in Mongo Repository
    // with this method we will all user that is save in our database
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllUser")
    public List<User> getAllUser(){
        return userRepo.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/getUser", params = "username")
    public User checkUsernameExist(@RequestParam String username){
        return userRepo.checkUsernameExist(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/getUser", params = "userId")
    public Optional<User> getUserByUserId(@RequestParam String userId){
        return userRepo.findById(userId);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/getUser", params = {"username", "password"})
    public User checkUsernameExist(@RequestParam String username ,@RequestParam String password){
        return userRepo.findEmployeeByUsernameAndPassword(username,password);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path = "/deleteUser/{userId}")
    public void deleteUserbyId(@PathVariable String userId){
        userRepo.deleteById(userId);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "/updateUser")
    public User updateUser(@RequestBody User user){
        return userRepo.save(user);
    }



}

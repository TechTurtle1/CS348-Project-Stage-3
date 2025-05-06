package website.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import website.user.model.User;
import website.user.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/website/users")
public class UserController {
    
    private UserService userService;
    
    @Autowired
    public UserController(UserService userService) {this.userService = userService; }
    
    @GetMapping("/all")
    public List<User> getAllUsers() {return this.userService.getAllUsers();}
    
    @GetMapping("/uuid/{user_id}")
    public User getUserById(@PathVariable UUID user_id) {return this.userService.getUserByUUID(user_id);}
    
    @GetMapping("/username/{username}")
    public Optional<User> getUserByUsername(@PathVariable String username) {return this.userService.getUserByUsername(username);}
    
    @GetMapping("/username/{username}/uuid")
    public Optional<UUID> getUUIDByUsername(@PathVariable String username) {return this.userService.getUUIDByUsername(username);}
    
    @PostMapping("")
    public User createNewUser(@RequestBody User user) {return this.userService.createNewUser(user);}
    
    @DeleteMapping("/uuid/{user_id}")
    public void deleteUserByUUID(@PathVariable UUID user_id) {this.userService.deleteUserByUUID(user_id);}
    
    @PutMapping("")
    public User updateExistingUser(@RequestBody User user) {return this.userService.updateExistingUser(user);}
    
    @GetMapping("uuid/{uuid}/money")
    public int getMoneyByUUID(@PathVariable UUID uuid) {
        return this.userService.getMoneyByUUID(uuid);
    }
    
    @PutMapping("uuid/{uuid}/money/{money}")
    public int changeMoneyByUUID(@PathVariable UUID uuid, @PathVariable int money) {
        return this.userService.changeMoneyByUUID(uuid, money);
    }
    
    @GetMapping("/username/{username}/all")
    public List<User> getAllUsersByUsername(@PathVariable String username) {
        return this.userService.getAllUsersByUsername(username);
    }
}

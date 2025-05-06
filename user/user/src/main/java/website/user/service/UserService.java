package website.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import website.user.model.User;
import website.user.repository.UserRepository;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    private static final int SALT_LENGTH = 16;
    private static final int ITERATIONS = 128000;
    private static final int KEY_LENGTH = 256;
    
    @Autowired
    public UserService(UserRepository userRepository) {this.userRepository = userRepository; }
    
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }
    
    public User getUserByUUID(UUID user_id) {
        return this.userRepository.findById(user_id).orElseThrow(() -> new RuntimeException());
    }
    
    public Optional<UUID> getUUIDByUsername(String username) {
        return this.userRepository.findUUIDByUsername(username);
    }
    
    public Optional<User> getUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }
    
    public User createNewUser(User user) {
        user.setUser_id(UUID.randomUUID());
        user.setExp(0);
        user.setMoney(0);
        user.setLevel(1);
        return this.userRepository.save(user);
    }
    
    public User updateExistingUser(User user) {
        return this.userRepository.save(user);
    }
    
    public void deleteUserByUUID(UUID uuid) {
        this.userRepository.deleteById(uuid);
    }
    
    public int getMoneyByUUID(UUID uuid) {
        User user = this.userRepository.findById(uuid).orElseThrow(() -> new RuntimeException());
        return user.getMoney();
    }
    
    public int changeMoneyByUUID(UUID uuid, int amount) {
        User user = this.userRepository.findById(uuid).orElseThrow(() -> new RuntimeException());
        user.setMoney(user.getMoney() + amount);
        this.userRepository.save(user);
        return user.getMoney();
    }
    
    public List<User> getAllUsersByUsername(String username) {
        return this.userRepository.findAllByUsername(username).orElseThrow(() -> new RuntimeException());
    }
}

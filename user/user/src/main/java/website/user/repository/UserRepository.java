package website.user.repository;

import org.springframework.data.jpa.repository.Query;
import website.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<User> findByUsername(String username);
    
    @Query("SELECT u FROM User u WHERE u.username LIKE :username%")
    Optional<List<User>> findAllByUsername(String username);
    
    @Query("SELECT u.user_id FROM User u WHERE u.username = :username")
    Optional<UUID> findUUIDByUsername(String username);
}

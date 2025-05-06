package website.user.model;

import jakarta.persistence.*;

import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Table(name = "users", indexes = {
        @Index(name = "idx_user_id", columnList = "user_id"),
        @Index(name = "idx_username", columnList = "username")
})
public class User {

    @Id
    @Column(name = "user_id")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID user_id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;
    
    @Column(name = "password")
    private String password;

    @Column(name = "level")
    private int level;

    @Column(name = "exp")
    private int exp;

    @Column(name = "money")
    private int money;
    
    public User() {}
    
    public User(UUID user_id, String username, String password, String email, int level, int exp, int money) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.level = level;
        this.exp = exp;
        this.money = money;
    }

}

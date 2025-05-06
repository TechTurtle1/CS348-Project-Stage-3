package website.user.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "itemrel", indexes = {
        @Index(name = "idx_user_id", columnList = "user_id, price"),
})
public class ItemRel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "itemrel_id")
    private long itemrel_id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "price")
    private int price;
    
    public ItemRel () {}
    
    public ItemRel (long itemrel_id, User user, Item item) {
        this.itemrel_id = itemrel_id;
        this.user = user;
        this.item = item;
        this.price = 0;
    }
}

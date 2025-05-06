package website.user.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "items")
public class Item {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private int item_id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "type")
    private String type;
    
    @Column(name = "rarity")
    private String rarity;
    
    @Column(name = "price")
    private int price;
    
    public Item() {}
    
    public Item(int item_id, String name, String type, String rarity, int price) {
        this.item_id = item_id;
        this.name = name;
        this.type = type;
        this.rarity = rarity;
        this.price = price;
    }
}

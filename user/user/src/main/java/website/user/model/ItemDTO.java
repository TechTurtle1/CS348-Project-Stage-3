package website.user.model;

import lombok.Data;

import java.util.UUID;

@Data
public class ItemDTO {

    private long item_id;
    private String name;
    private String type;
    private int price;

    private int value;
    
    public ItemDTO() {}
    
    public ItemDTO(long item_id, String name, String type, int price, int value) {
        this.item_id = item_id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.value = value;
    }

}
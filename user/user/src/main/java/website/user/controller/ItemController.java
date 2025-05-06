package website.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import website.user.model.Item;
import website.user.service.ItemService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/website/items")
public class ItemController {
    
    private ItemService itemService;
    
    @Autowired
    public ItemController (ItemService itemService) { this.itemService = itemService; }
    
    @GetMapping("")
    public List<Item> getAllItems() {
        return this.itemService.getAllItems();
    }
    
    @GetMapping("/types")
    public List<String> getAllTypes() {return this.itemService.getAllTypes(); }
    
    @GetMapping("/type/{type}")
    public List<Item> getAllItemsOfAType(@PathVariable String type) {
        return this.itemService.getAllItemsOfAType(type);
    }
    
    @GetMapping("/item/{item_id}")
    public Item getItemByID(@PathVariable Integer item_id) {
        return this.itemService.getItemByID(item_id);
    }
}

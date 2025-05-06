package website.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import website.user.model.Item;
import website.user.repository.ItemRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {
    
    private final ItemRepository itemRepository;
    
    @Autowired
    public ItemService(
            ItemRepository itemRepository
    ) {
        this.itemRepository = itemRepository;
    }
    
    public List<Item> getAllItems() {
        return this.itemRepository.findAll();
    }
    
    public List<String> getAllTypes() {
        List<String> returnedList = this.itemRepository.getAllTypes();
        returnedList.add(0, "On Sale");
        returnedList.add(0, "All Items");
        return returnedList;
    }
    
    public List<Item> getAllItemsOfAType(String type) {
        return this.itemRepository.getAllItemsOfAType(type);
    }
    
    public Item getItemByID(Integer item_id) {
        return this.itemRepository.findById(item_id).orElseThrow(() -> new RuntimeException());
    }
    
}

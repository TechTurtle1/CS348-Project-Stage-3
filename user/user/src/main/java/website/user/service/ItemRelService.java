package website.user.service;

import org.springframework.transaction.annotation.Isolation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import website.user.model.Item;
import website.user.model.ItemDTO;
import website.user.model.ItemRel;
import website.user.model.User;
import website.user.repository.ItemRelRepository;
import website.user.repository.ItemRepository;
import website.user.repository.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ItemRelService {

    private final ItemRelRepository itemRelRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    
    @Autowired
    public ItemRelService(
            ItemRelRepository itemRelRepository,
            UserRepository userRepository,
            ItemRepository itemRepository
    ) {
        this.itemRelRepository = itemRelRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    public List<ItemDTO> getItemsByPlayerIdAndType(UUID user_id, String type) {
        return this.itemRelRepository.findItemsByPlayerIdAndType(user_id, type);
    }

    public List<ItemDTO> getItemsByPlayerId(UUID user_id) {
        return this.itemRelRepository.findItemsByPlayerId(user_id);
    }

    public List<ItemDTO> getItemsByPlayerIdAndName(UUID user_id, String name) {
        return this.itemRelRepository.findItemsByPlayerIdAndName(user_id, name);
    }

    public ItemRel addItemByPlayerAndItemID(UUID user_id, Integer item_id) {
        User user = this.userRepository.findById(user_id).orElseThrow(() -> new RuntimeException());
        Item item = this.itemRepository.findById(item_id).orElseThrow(() -> new RuntimeException());
        
        if (user.getMoney() < item.getPrice()) {
            return null;
        }

        user.setMoney(user.getMoney() - item.getPrice());
        ItemRel itemRel = new ItemRel();
        itemRel.setUser(user);
        itemRel.setItem(item);
        itemRel.setPrice(0);
        return this.itemRelRepository.save(itemRel);
    }
    
    public void removeItemByItemID(Long item_id) {
        this.itemRelRepository.deleteById(item_id);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public ItemRel buyItemFromPlayer(UUID user_id, Long item_id) {
        User buyingUser = this.userRepository.findById(user_id).orElseThrow(() -> new RuntimeException());
        ItemRel item = this.itemRelRepository.findById(item_id).orElseThrow(() -> new RuntimeException());
        if (buyingUser.getMoney() < item.getPrice()) {
            return null;
        }
        User sellingUser = item.getUser();
        item.setUser(buyingUser);
        buyingUser.setMoney(buyingUser.getMoney() - item.getPrice());
        sellingUser.setMoney(sellingUser.getMoney() + item.getPrice());
        userRepository.save(buyingUser);
        userRepository.save(sellingUser);
        item.setPrice(0);
        itemRelRepository.save(item);
        return item;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void putToSale(Long item_id, Integer price) {
        ItemRel item = this.itemRelRepository.findById(item_id).orElseThrow(() -> new RuntimeException());
        item.setPrice(price);
    }
    
    public List<ItemDTO> findItemsOnSale(UUID user_id, Integer min_price, Integer max_price) {
        return this.itemRelRepository.findItemsOnSale(user_id, min_price, max_price);
    }
    
    public List<ItemDTO> findPlayerItemsOnSale(UUID user_id) {return this.itemRelRepository.findPlayerItemsOnSale(user_id);}
    
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void openCrate(UUID user_id, Long crate_id) {
        ItemRel crateInstance = this.itemRelRepository.findById(crate_id).orElseThrow(() -> new RuntimeException());
        List<Integer> possibleItems = this.itemRepository.getAllItemIDsOfACrate(crateInstance.getItem().getItem_id());
        int givenItem = (int)(Math.random() * possibleItems.size());

        User user = this.userRepository.findById(user_id).orElseThrow(() -> new RuntimeException());
        Item item = this.itemRepository.findById(possibleItems.get(givenItem)).orElseThrow(() -> new RuntimeException());
        ItemRel itemRel = new ItemRel();
        itemRel.setUser(user);
        itemRel.setItem(item);
        itemRel.setPrice(0);
        this.itemRelRepository.save(itemRel);
        removeItemByItemID(crate_id);
    }
    
    public Double findAveragePrice(String name) {
        return this.itemRelRepository.findAveragePrice(name);
    }
    
    public Integer findNumSellers(String name) {return this.itemRelRepository.findNumSellers(name);}
    
    public Integer calculateMoneyPerClick(UUID user_id) {
        List<ItemDTO> playerItems = getItemsByPlayerId(user_id);
        int clickPower = 0;
        for (ItemDTO item : playerItems) {
            if (item.getType().equals("Crate")) continue;
            clickPower += item.getValue();
        }
        return clickPower + 1;
    }
}
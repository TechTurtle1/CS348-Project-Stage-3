package website.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import website.user.model.ItemDTO;
import website.user.model.ItemRel;
import website.user.service.ItemRelService;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/website/items")
public class ItemRelController {

    private ItemRelService itemRelService;

    @Autowired
    public ItemRelController (ItemRelService itemRelService) {
        this.itemRelService = itemRelService;
    }

    @GetMapping("/player/{playerId}/type/{type}")
    public List<ItemDTO> getItemsByPlayerIdAndType(@PathVariable UUID playerId, @PathVariable String type) {
        return this.itemRelService.getItemsByPlayerIdAndType(playerId, type);
    }

    @GetMapping("/player/{playerId}")
    public List<ItemDTO> getItemsByPlayerId(@PathVariable UUID playerId) {
        return this.itemRelService.getItemsByPlayerId(playerId);
    }

    @GetMapping("/player/{playerId}/name/{name}")
    public List<ItemDTO> getItemsByPlayerIdAndName(@PathVariable UUID playerId, @PathVariable String name) {
        return this.itemRelService.getItemsByPlayerIdAndName(playerId, name);
    }
    
    @PostMapping("/player/{player_id}/item/{item_id}")
    public void addItemByPlayerAndItemId(@PathVariable UUID player_id, @PathVariable Integer item_id) {
        this.itemRelService.addItemByPlayerAndItemID(player_id, item_id);
    }
    
    @DeleteMapping("/item/{item_id}")
    public void removeItemById(@PathVariable Long item_id) {
        this.itemRelService.removeItemByItemID(item_id);
    }
    
    @PostMapping("/player/{user_id}/item/{item_id}/resell")
    public ItemRel buyItemFromPlayer(@PathVariable UUID user_id, @PathVariable Long item_id) {
        return this.itemRelService.buyItemFromPlayer(user_id, item_id);
    }
    
    @PostMapping("/item/{item_id}/price/{price}")
    public void putToSale(@PathVariable Long item_id, @PathVariable Integer price) {
        this.itemRelService.putToSale(item_id, price);
    }
    
    @GetMapping("/player/{user_id}/sales/leaveout/min/{min_price}/max/{max_price}")
    public List<ItemDTO> getItemsOnSale(@PathVariable UUID user_id, @PathVariable Integer min_price, @PathVariable Integer max_price) {
        return this.itemRelService.findItemsOnSale(user_id, min_price, max_price);
    }

    @GetMapping("/player/{user_id}/sales/include")
    public List<ItemDTO> getPlayerItemsOnSale(@PathVariable UUID user_id) {
        return this.itemRelService.findPlayerItemsOnSale(user_id);
    }

    @PostMapping("/player/{user_id}/crate/{crate_id}")
    public void openCrate(@PathVariable UUID user_id, @PathVariable Long crate_id) {
        this.itemRelService.openCrate(user_id, crate_id);
    }

    @GetMapping("/item/{name}/avgprice")
    public Double findAveragePrice(@PathVariable String name) {
        return this.itemRelService.findAveragePrice(name);
    }

    @GetMapping("/item/{name}/count")
    public Integer findNumSellers(@PathVariable String name) {
        return this.itemRelService.findNumSellers(name);
    }
    
    @GetMapping("/player/{user_id}/clickpower")
    public Integer calculateMoneyPerClick(@PathVariable UUID user_id) {
        return this.itemRelService.calculateMoneyPerClick(user_id);
    }
}
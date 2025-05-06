package website.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import website.user.model.Item;

import java.util.List;
import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Query("SELECT DISTINCT i.type FROM Item i")
    List<String> getAllTypes();
    
    @Query("SELECT new website.user.model.Item(i.item_id, i.name, i.type, i.rarity, i.price) " +
            "FROM Item i WHERE i.type = :type ")
    List<Item> getAllItemsOfAType(String type);

    @Query(value = "SELECT DISTINCT item_id FROM crateitems WHERE crate_id = :crate_id ", nativeQuery = true)
    List<Integer> getAllItemIDsOfACrate(Integer crate_id);
    
}

package website.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import website.user.model.ItemDTO;
import website.user.model.ItemRel;

import java.util.List;
import java.util.UUID;

@Repository
public interface ItemRelRepository extends JpaRepository<ItemRel, Long> {
    @Query(
            "SELECT new website.user.model.ItemDTO(ir.itemrel_id, i.name, i.type, ir.price, i.price) " +
                    "FROM ItemRel ir JOIN ir.item i " +
                    "WHERE ir.user.user_id = :user_id " +
                    "AND i.type LIKE %:type% " +
                    "AND ir.price = 0"
    )
    List<ItemDTO> findItemsByPlayerIdAndType(UUID user_id, String type);
    
    @Query(
            "SELECT new website.user.model.ItemDTO(ir.itemrel_id, i.name, i.type, ir.price, i.price) " +
                    "FROM ItemRel ir JOIN ir.item i " +
                    "WHERE ir.user.user_id = :user_id " +
                    "AND ir.price = 0"
    )
    List<ItemDTO> findItemsByPlayerId(UUID user_id);

    @Query(
            "SELECT new website.user.model.ItemDTO(ir.itemrel_id, i.name, i.type, ir.price, i.price) " +
                    "FROM ItemRel ir JOIN ir.item i " +
                    "WHERE ir.user.user_id = :user_id " +
                    "AND i.name LIKE :name% " +
                    "AND ir.price = 0"
    )
    List<ItemDTO> findItemsByPlayerIdAndName(UUID user_id, String name);

    @Query(
            "SELECT new website.user.model.ItemDTO(ir.itemrel_id, i.name, i.type, ir.price, i.price) " +
                    "FROM ItemRel ir JOIN ir.item i " +
                    "WHERE ir.price > 0 " +
                    "AND ir.price >= :min_price " +
                    "AND ir.price <= :max_price " +
                    "AND ir.user.user_id != :user_id " +
                    "AND ir.price = (SELECT MIN(ir2.price) " +
                    "FROM ItemRel ir2 " +
                    "WHERE ir2.item.item_id = i.item_id " +
                    "AND ir2.price > 0 AND ir2.price >= :min_price AND ir2.price <= :max_price) " +
                    "AND ir.itemrel_id = (SELECT ir3.itemrel_id " +
                    "FROM ItemRel ir3 " +
                    "WHERE ir3.item.item_id = i.item_id " +
                    "AND ir3.price = ir.price " +
                    "ORDER BY ir3.itemrel_id ASC LIMIT 1)"
    )
    List<ItemDTO> findItemsOnSale(UUID user_id, Integer min_price, Integer max_price);



    @Query(
            "SELECT new website.user.model.ItemDTO(ir.itemrel_id, i.name, i.type, ir.price, i.price) " +
                    "FROM ItemRel ir JOIN ir.item i " +
                    "WHERE ir.price > 0 " +
                    "AND ir.user.user_id = :user_id"
    )
    List<ItemDTO> findPlayerItemsOnSale(UUID user_id);

    @Query(
            "SELECT AVG(ir.price) " +
                    "FROM ItemRel ir JOIN ir.item i " +
                    "WHERE ir.price > 0 AND i.name = :name"
    )
    Double findAveragePrice(@Param("name") String name);

    @Query(
            "SELECT COUNT(ir.price) " +
                    "FROM ItemRel ir JOIN ir.item i " +
                    "WHERE ir.price > 0 AND i.name = :name"
    )
    Integer findNumSellers(@Param("name") String name);

}
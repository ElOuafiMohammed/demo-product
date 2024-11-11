package product.trial.master.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import product.trial.master.demo.enumeration.InventoryStatus;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductResDto {
    Long id;
    String code;
    String name;
    String description;
    String image;
    String category;
    Double price;
    Integer quantity;
    String internalReference;
    Long shellId;
    InventoryStatus inventoryStatus;
    Double rating;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

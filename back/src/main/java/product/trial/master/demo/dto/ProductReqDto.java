package product.trial.master.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import product.trial.master.demo.enumeration.InventoryStatus;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductReqDto {
    private String code;
    private String name;
    private String description;
    private String image;
    private String category;
    private Double price;
    private Integer quantity;
    private Double rating;
    private String internalReference;
    private Integer shellId;
    private InventoryStatus inventoryStatus;
}
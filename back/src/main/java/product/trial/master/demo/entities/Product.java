package product.trial.master.demo.entities;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import product.trial.master.demo.enumeration.InventoryStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * An entity class represents a table in a relational database
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Code cannot be blank")
    @Column(name = "Code", unique = true, nullable = false)
    private String code;

    @Column(name = "Name")
    private String name;

    @Column(name = "Description")
    private String description;

    @Column(name = "Image")
    private String image;

    @Column(name = "Category")
    private String category;

    @Column(name = "Price")
    @Min(value = 0, message = "Price cannot be negative")
    private Double price;

    @Column(name = "Quantity")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    @Column(name = "InternalReference")
    private String internalReference;

    @Column(name = "ShellId")
    private Integer shellId;

    @Enumerated(EnumType.STRING)
    @Column(name = "InventoryStatus")
    private InventoryStatus inventoryStatus;

    @Column(name = "Rating")
    private Double rating;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;


    // Custom setter with validation for quantity
    public void setQuantity(Integer quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative.");
        }
        this.quantity = quantity;
    }

    public void setPrice(Double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative.");
        }
        this.price = price;
    }

}
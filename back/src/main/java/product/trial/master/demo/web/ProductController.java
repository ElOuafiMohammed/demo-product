package product.trial.master.demo.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import product.trial.master.demo.dto.ProductReqDto;
import product.trial.master.demo.dto.ProductResDto;
import product.trial.master.demo.exception.EntityAlreadyExistsException;
import product.trial.master.demo.exception.NoSuchEntityExistsException;
import product.trial.master.demo.service.ProductService;

import java.util.List;

/**
 * ProductController handles all HTTP requests related to products.
 * It provides endpoints to create, read, update, and delete products.
 */
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    // Service layer dependency to handle business logic
    private final ProductService productService;

    /**
     * Fetches all products.
     *
     * Endpoint: GET /api/products
     *
     * @return ResponseEntity containing the list of all products with HTTP status 200 OK
     */
    @GetMapping("")
    public ResponseEntity<List<ProductResDto>> getAllProducts() {
        List<ProductResDto> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    /**
     * Fetches a product by its ID.
     *
     * Endpoint: GET /api/products/{id}
     *
     * @param id - The ID of the product to fetch
     * @return ResponseEntity containing the product with the given ID and HTTP status 200 OK
     * @throws NoSuchEntityExistsException if the product with the given ID does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResDto> getProductById(@PathVariable Long id) {
        ProductResDto product = productService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    /**
     * Creates a new product.
     *
     * Endpoint: POST /api/products
     *
     * @param requestBody - The Product data to be saved, provided as a ProductReqDto
     * @return ResponseEntity containing the created product and HTTP status 201 CREATED
     * @throws EntityAlreadyExistsException if the product with the given CODE does  exist
     */
    @PostMapping("")
    public ResponseEntity<ProductResDto> saveProduct(@RequestBody ProductReqDto requestBody) {
        ProductResDto createdProduct = productService.saveProduct(requestBody);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    /**
     * Updates an existing product.
     *
     * Endpoint: PATCH /api/products/{id}
     *
     * @param id - The ID of the product to update
     * @param requestBody - The updated product data, provided as a ProductReqDto
     * @return ResponseEntity containing the updated product and HTTP status 200 OK
     * @throws NoSuchEntityExistsException if the product with the given ID does not exist
     */
    @PatchMapping("/{id}")
    public ResponseEntity<ProductResDto> updateProduct(
            @PathVariable(value = "id") Long id, @RequestBody ProductReqDto requestBody) {
        ProductResDto updatedProduct = productService.updateProduct(id, requestBody);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    /**
     * Deletes a product by its ID.
     *
     * Endpoint: DELETE /api/products/{id}
     *
     * @param id - The ID of the product to delete
     * @return ResponseEntity with a success message and HTTP status 200 OK
     * @throws NoSuchEntityExistsException if the product with the given ID does not exist
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }
}
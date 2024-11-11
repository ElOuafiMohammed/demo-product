package product.trial.master.demo.service.Impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import product.trial.master.demo.dto.ProductReqDto;
import product.trial.master.demo.dto.ProductResDto;
import product.trial.master.demo.entities.Product;
import product.trial.master.demo.enumeration.InventoryStatus;
import product.trial.master.demo.exception.NoSuchEntityExistsException;
import product.trial.master.demo.exception.EntityAlreadyExistsException;
import product.trial.master.demo.mapper.ProductReqMapper;
import product.trial.master.demo.mapper.ProductResMapper;
import product.trial.master.demo.repositories.ProductRepository;
import product.trial.master.demo.service.ProductService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer is where all the business logic lies
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    private final ProductReqMapper productReqMapper = ProductReqMapper.INSTANCE;
    private final ProductResMapper productResMapper = ProductResMapper.INSTANCE;

    public List<ProductResDto> getAllProducts(){
        log.info("Getting All Products");
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productResMapper::toDto)
                .collect(Collectors.toList());
    }

    public ProductResDto getProductById(Long id){
        log.info("Getting product with id: {}", id);
        Product product = getProductOrthrowNoEntityFound(id);
        return productResMapper.toDto(product);
    }

    public ProductResDto saveProduct (ProductReqDto requestBody){
        log.info("Adding new Product");

        productRepository.findByCode(requestBody.getCode()).ifPresent(product -> {
            log.warn("Product already exists with code {}", requestBody.getCode());
            throw  new EntityAlreadyExistsException("Product already exists");
        });
        // Default value INSTOCK
        checkInventoryStatus(requestBody,InventoryStatus.INSTOCK);

        Product product = productReqMapper.toEntity(requestBody);
            product.setCreatedAt(LocalDateTime.now());
            product.setUpdatedAt(LocalDateTime.now());
            Product savedProduct =  productRepository.save(product);
            log.info("Product added successfully", product);
            return  productResMapper.toDto(savedProduct);
    }



    public ProductResDto updateProduct (Long id, ProductReqDto requestBody) {
        log.info("Updating existing Product with  id: {} ", id);

        Product existingProduct = getProductOrthrowNoEntityFound(id);
        checkInventoryStatus(requestBody, existingProduct.getInventoryStatus());

        productReqMapper.updateProductFromDto(requestBody, existingProduct);
            existingProduct.setUpdatedAt(LocalDateTime.now());
            Product updatedProduct = productRepository.save(existingProduct);
            log.info("Product has been updated Successfully");
            return productResMapper.toDto(updatedProduct);

    }

    public void deleteProductById (Long id) {
        log.info("Deleting product with id: {}", id);
        Product product = getProductOrthrowNoEntityFound(id);
        productRepository.delete(product);
        log.info("Product has been deleted successfully");
    }

    private Product getProductOrthrowNoEntityFound(Long id) {
        Product product = productRepository.findById(id).orElseThrow(()-> {
            log.error("No product present with id: {}", id);
            return new NoSuchEntityExistsException("NO Product PRESENT WITH ID = " + id);
        });
        return product;
    }

    private void checkInventoryStatus(ProductReqDto requestBody, InventoryStatus inventoryStatus) {
        if (requestBody.getInventoryStatus() != null) {
            try {
                requestBody.setInventoryStatus(InventoryStatus.valueOf(requestBody.getInventoryStatus().name()));
            } catch (IllegalArgumentException e) {
                requestBody.setInventoryStatus(inventoryStatus);
            }
        }
    }
}

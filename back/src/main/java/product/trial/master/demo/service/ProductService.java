package product.trial.master.demo.service;


import product.trial.master.demo.dto.ProductReqDto;
import product.trial.master.demo.dto.ProductResDto;

import java.util.List;

public interface ProductService {
    public List<ProductResDto> getAllProducts();
    public ProductResDto getProductById(Long id);
    public ProductResDto saveProduct (ProductReqDto requestBody);
    public ProductResDto updateProduct (Long id, ProductReqDto patch);
    public void deleteProductById (Long id);
}

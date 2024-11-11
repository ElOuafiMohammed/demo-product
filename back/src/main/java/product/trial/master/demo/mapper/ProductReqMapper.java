package product.trial.master.demo.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import product.trial.master.demo.dto.ProductReqDto;
import product.trial.master.demo.entities.Product;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)

public interface ProductReqMapper {
    ProductReqMapper INSTANCE = Mappers.getMapper(ProductReqMapper.class);

    void updateProductFromDto(ProductReqDto dto, @MappingTarget Product entity);
    Product toEntity(ProductReqDto dto);
    ProductReqDto toDto(Product entity);

}

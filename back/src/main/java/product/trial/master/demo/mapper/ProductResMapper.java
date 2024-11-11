package product.trial.master.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import product.trial.master.demo.dto.ProductResDto;
import product.trial.master.demo.entities.Product;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)

public interface ProductResMapper {
    ProductResMapper INSTANCE = Mappers.getMapper(ProductResMapper.class);
    Product toEntity(ProductResDto dto);
    ProductResDto toDto(Product entity);

}

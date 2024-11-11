package product.trial.master.demo.exception;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntityAlreadyExistsException extends RuntimeException {
    private String message;

}
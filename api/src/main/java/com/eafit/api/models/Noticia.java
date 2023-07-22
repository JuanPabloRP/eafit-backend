package com.eafit.api.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(value="Noticia")
public class Noticia implements Serializable {
    @Id
    Long id;
    String title;
    String Description;
    String tags;
    String link;
    String image;
    String tipoNoticia;

}

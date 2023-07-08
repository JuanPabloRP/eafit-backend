package com.eafit.api.repository;

import com.eafit.api.models.Noticia;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoticiaRepositoryInterface extends MongoRepository<Noticia, Long> {
}

package com.eafit.api.services;

import com.eafit.api.models.Noticia;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NoticiaServicesInter {

    List<Noticia> getAll();
    Noticia saveNew(Noticia noticia);

    void delete(Long id);
}

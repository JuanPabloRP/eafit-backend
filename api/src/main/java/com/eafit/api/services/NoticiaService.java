package com.eafit.api.services;

import com.eafit.api.models.Noticia;
import com.eafit.api.repository.NoticiaRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticiaService implements NoticiaServicesInter {

    @Autowired
    private NoticiaRepositoryInterface noticiaRepositoryInterface;

    @Override
    public List<Noticia> getAll() {
        return noticiaRepositoryInterface.findAll();
    }

    @Override
    public Noticia saveNew(Noticia noticia) {
         return noticiaRepositoryInterface.save(noticia);
    }

    @Override
    public void delete(Long id) {
        noticiaRepositoryInterface.deleteById(id);
    }

}

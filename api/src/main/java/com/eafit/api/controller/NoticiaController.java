package com.eafit.api.controller;

import com.eafit.api.models.Noticia;
import com.eafit.api.services.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/news")
public class NoticiaController {

    @Autowired
    private NoticiaService noticiaService;

    @PostMapping(value="/join")
    public Noticia saveNews(@RequestBody Noticia noticia){
         return noticiaService.saveNew(noticia);
    }

    @GetMapping(value="/findAll")
    public List<Noticia> findAllNews(){
        return noticiaService.getAll();
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable Long id){
        noticiaService.delete(id);
    }
}

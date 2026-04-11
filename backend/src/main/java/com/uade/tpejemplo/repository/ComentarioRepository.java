package com.uade.tpejemplo.repository;

import com.uade.tpejemplo.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByClienteDni(String dni);

    List<Comentario> findByCreditoId(Long idCredito);

    List<Comentario> findByCobranzaId(Long idCobranza);
}
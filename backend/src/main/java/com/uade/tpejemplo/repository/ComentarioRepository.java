package com.uade.tpejemplo.repository;

import com.uade.tpejemplo.model.Comentario;
import com.uade.tpejemplo.model.TipoEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByClienteDni(String dni);

    List<Comentario> findByCreditoId(Long idCredito);

    List<Comentario> findByCobranzaId(Long idCobranza);

    List<Comentario> findByTipoEntidad(TipoEntidad tipoEntidad);

    List<Comentario> findByUsuarioId(Long idUsuario);
}

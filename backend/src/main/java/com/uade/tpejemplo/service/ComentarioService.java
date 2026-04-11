package com.uade.tpejemplo.service;

import com.uade.tpejemplo.dto.request.ComentarioRequest;
import com.uade.tpejemplo.dto.response.ComentarioResponse;

import java.util.List;

public interface ComentarioService {

    ComentarioResponse crear(ComentarioRequest request, String username);

    List<ComentarioResponse> listarTodos();

    ComentarioResponse buscarPorId(Long id);

    ComentarioResponse actualizar(Long id, ComentarioRequest request);

    void eliminar(Long id);

    List<ComentarioResponse> listarPorCliente(String dni);

    List<ComentarioResponse> listarPorCredito(Long idCredito);

    List<ComentarioResponse> listarPorCobranza(Long idCobranza);
}
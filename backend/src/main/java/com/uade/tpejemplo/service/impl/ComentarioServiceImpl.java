package com.uade.tpejemplo.service.impl;

import com.uade.tpejemplo.dto.request.ComentarioRequest;
import com.uade.tpejemplo.dto.response.ComentarioResponse;
import com.uade.tpejemplo.exception.BusinessException;
import com.uade.tpejemplo.exception.ResourceNotFoundException;
import com.uade.tpejemplo.model.Cliente;
import com.uade.tpejemplo.model.Cobranza;
import com.uade.tpejemplo.model.Comentario;
import com.uade.tpejemplo.model.Credito;
import com.uade.tpejemplo.model.Usuario;
import com.uade.tpejemplo.repository.ClienteRepository;
import com.uade.tpejemplo.repository.CobranzaRepository;
import com.uade.tpejemplo.repository.ComentarioRepository;
import com.uade.tpejemplo.repository.CreditoRepository;
import com.uade.tpejemplo.repository.UsuarioRepository;
import com.uade.tpejemplo.service.ComentarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComentarioServiceImpl implements ComentarioService {

    private final ComentarioRepository comentarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final CreditoRepository creditoRepository;
    private final CobranzaRepository cobranzaRepository;

    @Override
    public ComentarioResponse crear(ComentarioRequest request, String username) {
        validarReferencia(request);

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "username", username));

        Comentario comentario = new Comentario();
        comentario.setContenido(request.getContenido());
        comentario.setTipoEntidad(request.getTipoEntidad());
        comentario.setFechaCreacion(LocalDateTime.now());
        comentario.setUsuario(usuario);

        asignarEntidadRelacionada(comentario, request);

        comentarioRepository.save(comentario);
        return toResponse(comentario);
    }

    @Override
    public List<ComentarioResponse> listarTodos() {
        return comentarioRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public ComentarioResponse buscarPorId(Long id) {
        Comentario comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentario", "id", id));

        return toResponse(comentario);
    }

    @Override
    public ComentarioResponse actualizar(Long id, ComentarioRequest request) {
        validarReferencia(request);

        Comentario comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentario", "id", id));

        comentario.setContenido(request.getContenido());
        comentario.setTipoEntidad(request.getTipoEntidad());

        comentario.setCliente(null);
        comentario.setCredito(null);
        comentario.setCobranza(null);

        asignarEntidadRelacionada(comentario, request);

        comentarioRepository.save(comentario);
        return toResponse(comentario);
    }

    @Override
    public void eliminar(Long id) {
        Comentario comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentario", "id", id));

        comentarioRepository.delete(comentario);
    }

    @Override
    public List<ComentarioResponse> listarPorCliente(String dni) {
        return comentarioRepository.findByClienteDni(dni)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<ComentarioResponse> listarPorCredito(Long idCredito) {
        return comentarioRepository.findByCreditoId(idCredito)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<ComentarioResponse> listarPorCobranza(Long idCobranza) {
        return comentarioRepository.findByCobranzaId(idCobranza)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private void validarReferencia(ComentarioRequest request) {
        switch (request.getTipoEntidad()) {
            case CLIENTE -> {
                if (request.getDniCliente() == null || request.getDniCliente().isBlank()) {
                    throw new BusinessException("Para tipoEntidad CLIENTE debe informar dniCliente.");
                }
                if (request.getIdCredito() != null || request.getIdCobranza() != null) {
                    throw new BusinessException("Para tipoEntidad CLIENTE solo debe informar dniCliente.");
                }
            }
            case CREDITO -> {
                if (request.getIdCredito() == null) {
                    throw new BusinessException("Para tipoEntidad CREDITO debe informar idCredito.");
                }
                if (request.getDniCliente() != null || request.getIdCobranza() != null) {
                    throw new BusinessException("Para tipoEntidad CREDITO solo debe informar idCredito.");
                }
            }
            case COBRANZA -> {
                if (request.getIdCobranza() == null) {
                    throw new BusinessException("Para tipoEntidad COBRANZA debe informar idCobranza.");
                }
                if (request.getDniCliente() != null || request.getIdCredito() != null) {
                    throw new BusinessException("Para tipoEntidad COBRANZA solo debe informar idCobranza.");
                }
            }
        }
    }

    private void asignarEntidadRelacionada(Comentario comentario, ComentarioRequest request) {
        switch (request.getTipoEntidad()) {
            case CLIENTE -> {
                Cliente cliente = clienteRepository.findByDni(request.getDniCliente())
                        .orElseThrow(() -> new ResourceNotFoundException("Cliente", "dni", request.getDniCliente()));
                comentario.setCliente(cliente);
            }
            case CREDITO -> {
                Credito credito = creditoRepository.findById(request.getIdCredito())
                        .orElseThrow(() -> new ResourceNotFoundException("Credito", "id", request.getIdCredito()));
                comentario.setCredito(credito);
            }
            case COBRANZA -> {
                Cobranza cobranza = cobranzaRepository.findById(request.getIdCobranza())
                        .orElseThrow(() -> new ResourceNotFoundException("Cobranza", "id", request.getIdCobranza()));
                comentario.setCobranza(cobranza);
            }
        }
    }

    private ComentarioResponse toResponse(Comentario comentario) {
        return new ComentarioResponse(
                comentario.getId(),
                comentario.getTipoEntidad(),
                comentario.getContenido(),
                comentario.getFechaCreacion(),
                comentario.getUsuario().getUsername(),
                comentario.getCliente() != null ? comentario.getCliente().getDni() : null,
                comentario.getCredito() != null ? comentario.getCredito().getId() : null,
                comentario.getCobranza() != null ? comentario.getCobranza().getId() : null
        );
    }
}
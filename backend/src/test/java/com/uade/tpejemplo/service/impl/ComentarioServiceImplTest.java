package com.uade.tpejemplo.service.impl;

import com.uade.tpejemplo.dto.request.ComentarioRequest;
import com.uade.tpejemplo.dto.response.ComentarioResponse;
import com.uade.tpejemplo.exception.BusinessException;
import com.uade.tpejemplo.model.Cliente;
import com.uade.tpejemplo.model.Comentario;
import com.uade.tpejemplo.model.Rol;
import com.uade.tpejemplo.model.TipoEntidad;
import com.uade.tpejemplo.model.Usuario;
import com.uade.tpejemplo.repository.ClienteRepository;
import com.uade.tpejemplo.repository.CobranzaRepository;
import com.uade.tpejemplo.repository.ComentarioRepository;
import com.uade.tpejemplo.repository.CreditoRepository;
import com.uade.tpejemplo.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ComentarioServiceImplTest {

    @Mock
    private ComentarioRepository comentarioRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private CreditoRepository creditoRepository;

    @Mock
    private CobranzaRepository cobranzaRepository;

    @InjectMocks
    private ComentarioServiceImpl comentarioService;

    @Test
    void crearComentarioDeClienteDevuelveElDtoEsperado() {
        Usuario usuario = Usuario.builder()
                .id(1L)
                .username("juan")
                .password("secret")
                .rol(Rol.ADMIN)
                .build();
        Cliente cliente = new Cliente("12345678", "Juan Perez", null);

        ComentarioRequest request = new ComentarioRequest();
        request.setContenido("Cliente con buen historial de pagos.");
        request.setTipoEntidad(TipoEntidad.CLIENTE);
        request.setDniCliente("12345678");

        when(usuarioRepository.findByUsername("juan")).thenReturn(Optional.of(usuario));
        when(clienteRepository.findByDni("12345678")).thenReturn(Optional.of(cliente));
        when(comentarioRepository.save(any(Comentario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ComentarioResponse response = comentarioService.crear(request, "juan");

        assertEquals("Cliente con buen historial de pagos.", response.getContenido());
        assertEquals(TipoEntidad.CLIENTE, response.getTipoEntidad());
        assertEquals("juan", response.getNombreUsuario());
        assertEquals("12345678", response.getDniCliente());
    }

    @Test
    void crearComentarioConTipoEntidadNuloLanzaBusinessException() {
        ComentarioRequest request = new ComentarioRequest();
        request.setContenido("Comentario sin tipo");

        BusinessException exception = assertThrows(
                BusinessException.class,
                () -> comentarioService.crear(request, "juan")
        );

        assertEquals("El tipo de entidad es obligatorio.", exception.getMessage());
    }
}
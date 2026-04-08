package com.uade.tpejemplo.dto.response;

/**
 * ‼ 📤 DTO de salida para la consulta de un comentario.
 * <p>
 * 👉 En esencia:
 * Encapsula los datos que el servidor devuelve al cliente tras una operación exitosa,
 * evitando exponer directamente la entidad.
 * <p>
 * ✅ Beneficios:
 * 1️⃣ Protege datos sensibles.
 * 2️⃣ Reduce el payload al mínimo necesario.
 * 3️⃣ Desacopla la respuesta del modelo interno.
 * <p>
 * 📌 Nota:
 * La entidad referenciada (Crédito o Cobranza) es opcional e indica
 * el objeto sobre el cual se realizó el comentario.
 *
 */

// ▶ Importaciones

import com.uade.tpejemplo.model.TipoEntidad;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
@Data
@AllArgsConstructor
public class ComentarioResponse {

    // ▶ Identificación
    private Long id;
    private TipoEntidad tipoEntidad;

    // ▶ Contenido
    private String contenido;
    private LocalDateTime fechaCreacion;

    // ▶ Cliente
    private String nombreUsuario;
    private String dniCliente;

    // ▶ Entidad referenciada
    private Long idCredito;
    private Long idCobranza;
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
}

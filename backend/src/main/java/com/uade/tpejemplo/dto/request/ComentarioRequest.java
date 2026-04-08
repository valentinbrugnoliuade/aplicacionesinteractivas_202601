package com.uade.tpejemplo.dto.request;

/**
 *   ‼ 📥 DTO de entrada para la creación de un comentario.
 *
 *   👉 En esencia:
 *   Encapsula y valida los datos enviados por el cliente en el cuerpo de la request,
 *   evitando exponer directamente la entidad.
 *
 *   ✅ Beneficios:
 *   1️⃣ Valida la entrada.
 *   2️⃣ Evita exponer la entidad directamente.
 *   3️⃣ Desacopla la API del modelo interno.
 *
 *   📌 Nota:
 *   El usuario se obtiene del token JWT y la fecha de creación se asigna automáticamente,
 *   por lo que no se incluyen acá.
 *
 */

// ▶ Importaciones
import com.uade.tpejemplo.model.TipoEntidad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
@Data
public class ComentarioRequest {

    // ▶ Obligatorios
    @NotBlank(message = "El contenido es obligatorio.")
    @Size(max = 1000, message = "El contenido no puede superar los 1000 caracteres.")
    private String contenido;

    @NotNull(message = "El tipo de entidad es obligatorio")
    private TipoEntidad tipoEntidad;

    // ▶ Adicionales
    private String dniCliente;
    private Long idCredito;
    private Long idCobranza;
// ═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
}

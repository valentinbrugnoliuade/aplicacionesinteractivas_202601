package com.uade.tpejemplo.dto.request;

import com.uade.tpejemplo.model.TipoEntidad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComentarioRequest {

    @NotBlank(message = "El contenido es obligatorio.")
    @Size(min = 3, max = 1000, message = "El contenido debe tener entre 3 y 1000 caracteres.")
    private String contenido;

    @NotNull(message = "El tipo de entidad es obligatorio.")
    private TipoEntidad tipoEntidad;

    private String dniCliente;
    private Long idCredito;
    private Long idCobranza;

    // Getters
    public String getContenido() { return contenido; }
    public TipoEntidad getTipoEntidad() { return tipoEntidad; }
    public String getDniCliente() { return dniCliente; }
    public Long getIdCredito() { return idCredito; }
    public Long getIdCobranza() { return idCobranza; }

    // Setters
    public void setContenido(String contenido) { this.contenido = contenido; }
    public void setTipoEntidad(TipoEntidad tipoEntidad) { this.tipoEntidad = tipoEntidad; }
    public void setDniCliente(String dniCliente) { this.dniCliente = dniCliente; }
    public void setIdCredito(Long idCredito) { this.idCredito = idCredito; }
    public void setIdCobranza(Long idCobranza) { this.idCobranza = idCobranza; }
}
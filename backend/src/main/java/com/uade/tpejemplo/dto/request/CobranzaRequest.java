package com.uade.tpejemplo.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CobranzaRequest {

    @NotNull(message = "El ID del crédito es obligatorio")
    private Long idCredito;

    @NotNull(message = "El número de cuota es obligatorio")
    private Integer idCuota;

    @NotNull(message = "El importe es obligatorio")
    @Positive(message = "El importe debe ser mayor a cero")
    private BigDecimal importe;

    // Getters
    public Long getIdCredito() { return idCredito; }
    public Integer getIdCuota() { return idCuota; }
    public BigDecimal getImporte() { return importe; }

    // Setters
    public void setIdCredito(Long idCredito) { this.idCredito = idCredito; }
    public void setIdCuota(Integer idCuota) { this.idCuota = idCuota; }
    public void setImporte(BigDecimal importe) { this.importe = importe; }
}

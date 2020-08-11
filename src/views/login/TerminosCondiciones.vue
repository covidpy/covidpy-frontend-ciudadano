<template>
  <v-container>
  <ol :class="{'pr-3': $vuetify.breakpoint.mdAndDown}">
    <li>
      <h5 class="text-left">Aceptación de Términos:</h5>
      <p align="justify">
        Al registrarse a la plataforma, el Usuario acepta
        plenamente y sin reservas el contenido de los términos y condiciones de uso.
        Estos términos consisten en un acuerdo colaborativo entre el Usuario y la
        plataforma para seguimiento del estado de las personas en relación con el
        COVID-19 (en adelante “la Plataforma”), que abarca todo su acceso y uso, lo
        que incluye el uso de toda la información, datos, herramientas, productos,
        servicios y otro contenido disponible mediante la Plataforma para el control
        establecido por el MSPBS en el marco de la pandemia de COVID-19,
        conforme a lo dispuesto en el Capítulo III del Código Sanitario y las
        disposiciones emitidas por la Autoridad Sanitaria. Al utilizar esta Plataforma,
        usted confirma que comprende y está de acuerdo con las siguientes
        condiciones:
      </p>
    </li>
    <li align="justify">
      <h5>Restricciones de Uso:</h5>
      <p>La utilización de la Plataforma está permitida
        solamente para personas mayores de 14 (catorce) años.
      </p>
    </li>
    <li align="justify">
      <h5>Responsabilidad del Usuario:</h5>
      <p>El Usuario está obligado a proporcionar
        personalmente información veraz y a mantenerla actualizada conforme a lo
        dispuesto en el art. 1 de la Resolución 112 de fecha 24 de marzo de 2020 del
        Ministerio de Salud Pública y Bienestar Social (en adelante el “MSPBS”). El
        incumplimiento de tal obligación por parte del Usuario, lo hace responsable
        por las consecuencias civiles y penales que de ella resulten.
      </p>
      <p>Las informaciones proporcionadas por el Usuario en la Plataforma tendrán
        carácter de declaración jurada, conforme al art. 2 de la Resolución MSPBS
        N° 112 de fecha 24 de marzo de 2020, siendo las declaraciones falsas
        pasibles de multas o hasta 5 años de pena privativa de libertad, conforme a lo
        dispuesto en el Art. 243 del Código Penal.
      </p>
      <p>En tal carácter, las credenciales de acceso (usuario/contraseña) son de uso
        personal y no deben ser compartidas con ninguna persona. Las credenciales
        entregadas son equivalentes a una Firma Electrónica conforme a las
        disposiciones de la Ley N˚4017/10, por lo que los mensajes de datos que se
        transmitan en uso de estas credenciales surtirán los efectos jurídicos que la
        legislación atribuye, reputándose realizados y provenientes del Usuario que
        los remite. El Usuario es responsable por el contenido que los individuos no
        autorizados produzcan al usar esta Plataforma utilizando con su permiso, su
        perfil registrado. Esta regla no se aplica a los casos de violación u otros
        problemas de seguridad de la Plataforma.
      </p>
      <p>El usuario está de acuerdo que al usar la Plataforma no publicará, enviará,
        distribuirá ni divulgará contenido o información de carácter difamatorio,
        obsceno o ilícito, inclusive información de propiedad exclusiva perteneciente
        a otras personas o instituciones, así como marcas registradas o información
        protegida por derechos de autor, sin la expresa autorización del propietario
        de esos derechos.
      </p>
      <p>El Usuario no está autorizado a manipular los parámetros de seguridad ni
        evadir los controles implementados en el sistema de la Plataforma. En caso
        de hacerlo será pasible de las sanciones establecidas en el Art. 175 del
        Código Penal.
      </p>
    </li>
    <li align="justify">
      <h5>Responsabilidad del MITIC</h5>
      <p>El Ministerio de Tecnologías de la Información y
        de la Comunicación (“MITIC”) no será responsable de la exactitud, veracidad,
        contenido o cualquier error en la información proporcionada por el Usuario o
        las instituciones públicas.
      </p>
    </li>
    <li align="justify">
      <h5>Acceso a Base de Datos</h5>
      <p>Los datos personales (nombre, número de cédula,
        teléfono, dirección y su ubicación georeferencial) proporcionados por el
        Usuario formarán parte de una base de datos a la que podrán acceder las
        autoridades nacionales competentes. Los datos de salud serán considerados
        datos sensibles y su acceso será restringido, teniendo en cuenta las medidas
        de seguridad para el tratamiento de dichos datos. Además, el uso de los
        datos médicos tendrá carácter confidencial, conforme a lo dispuesto en el art.
        2 de la Resolución MSPBS N° 112 de fecha 24 de marzo de 2020.Todos
        estos datos podrán ser utilizados con fines estadísticos y serán conservados
        mientras sea necesario para la aplicación de las medidas declaradas en la
        emergencia sanitaria.
      </p>
    </li>
    <li align="justify">
      <h5>Leyes, derechos y deberes</h5>
      <p>Es política del equipo del MITIC responsable de
        la programación de la Plataforma, cumplir todas las leyes y resoluciones
        aplicables y vigentes. Estos Términos de Uso y el uso de la Plataforma son y
        serán regidos e interpretados de acuerdo con las leyes internas de la
        República del Paraguay. En caso de cualquier conflicto entre las leyes,
        decretos y resoluciones extranjeras y de la República del Paraguay deberán
        prevalecer la legislación nacional. La Plataforma prevé un sistema de
        control de acceso a cualquiera de sus áreas donde los usuarios transmiten
        información, pudiendo retirar el acceso a cualesquiera de estas informaciones
        o comunicaciones. Si usted tiene alguna duda en relación a la Plataforma, no
        dude en contactarnos mediante el e-mail: soporte@mspbs.gov.py
      </p>
      <p>El MITIC se reserva, en todos los sentidos, el derecho de actualizar y
        modificar en cualquier momento y de cualquier forma, de manera unilateral y
        sin previo aviso, las presentes condiciones de uso, políticas de privacidad y
        los contenidos de la Plataforma.
      </p>
    </li>
  </ol>
    <v-btn color="white" class="ma-0 accent full-width" text  type="submit"
           :to="{name:'login'}"
    >Volver
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    name: "TerminosCondiciones"
  }
</script>

<style scoped>

</style>

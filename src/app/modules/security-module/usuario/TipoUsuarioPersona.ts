export class TipoUsuarioPersona {
    _id: string;
    persona: string;
    usuario: string;
    tipoUsuario: string;
    estado: number;

}


export class ModeloTipoUsuarioPersona {
    _id: string;
    estado: string;
    usuario: ModeloUsuario = new ModeloUsuario();
    persona: ModeloPersona = new ModeloPersona();
    tipoUsuario: ModeloTipoUsuario = new ModeloTipoUsuario();
    imagen: string;
}


export class ModeloUsuario {
    _id: string;
    clave: string;
    playerId: string;
    avatar: string;
    imagen: string;
}


export class ModeloTipoUsuario {
    _id: string;
    descripcion: string;
    codigo: string;
}

export class ModeloPersona {
    _id: string = '';
    nombres: string = '';
    apellidos: string = '';
    fechaNacimiento: Date;
    identificacion: string = '';
    correo: string = '';
    sector: string = '';
    avatar: string = '';
}


export class TipoUsuarioPersonaDto extends ModeloPersona {
    playerId: string = '';
    clave: string = '';
    estado: string = '';
    sector: string = '';
    tipoUsuario: string = '';
}

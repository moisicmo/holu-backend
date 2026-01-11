import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AvatarsService {
  findAll(): string[] {
    const avatarsDir = join(__dirname, '..', '..', '..', '..', 'public', 'avatars');
    const baseUrl = 'https://holu-backend-production.up.railway.app/static/avatars';

    const files = readdirSync(avatarsDir);

    // Opcional: filtrar solo imágenes .png o .jpg
    const images = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp'));

    return images.map(file => `${baseUrl}/${file}`);
  }
}

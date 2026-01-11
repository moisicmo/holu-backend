import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AvatarsService {
  findAll(): string[] {
    const avatarsDir = join(process.cwd(), 'public', 'avatars');

    const files = readdirSync(avatarsDir);

    const images = files.filter(
      file =>
        file.endsWith('.png') ||
        file.endsWith('.jpg') ||
        file.endsWith('.webp'),
    );

    return images;
  }
}

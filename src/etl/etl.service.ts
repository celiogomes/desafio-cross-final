import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EtlService {

    constructor(private http: HttpService) {}

    async findOne(id: number) {
        const ul = `http://challenge.dienekes.com.br/api/numbers?page=${id}`;
        try {
            const response = await this.http.get(ul).toPromise();
            const valor =(response.data.numbers)
            return valor;
        }catch (err) {
            const ad = [id]
            return ad;
        }
    }
}

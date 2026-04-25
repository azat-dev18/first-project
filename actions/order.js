'use server';

import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

const tableMap = {
    'esg-audit': 'esg_audit_orders',
    'energy': 'energy_orders',
    'dashboards': 'dashboard_orders',
};

export async function submitOrder(formData) {
    const service = formData.get('service'); // 'esg-audit', 'energy', 'dashboards'
    const full_name = formData.get('full_name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const address = formData.get('address');

    const tableName = tableMap[service];
    if (!tableName) throw new Error('Неизвестная услуга');

    const client = await pool.connect();
    try {
        await client.query(
            `INSERT INTO ${tableName} (full_name, phone, email, address) VALUES ($1, $2, $3, $4)`,
            [full_name, phone, email, address]
        );
        return { success: true };
    } catch (error) {
        console.error('Ошибка сохранения заказа:', error);
        throw new Error('Не удалось сохранить заказ');
    } finally {
        client.release();
    }
}
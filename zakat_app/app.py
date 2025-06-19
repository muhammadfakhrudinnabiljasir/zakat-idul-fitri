import os
from flask import Flask, render_template, request, redirect, url_for, flash
from dotenv import load_dotenv
from database import db, Payer
import click

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev')
    
    # Configure database
    db_path = os.path.join(os.path.dirname(__file__), 'zakat.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    @app.route('/')
    def index():
        payers = Payer.query.order_by(Payer.name).all()
        return render_template('index.html', payers=payers)

    @app.route('/payers/add', methods=['POST'])
    def add_payer():
        name = request.form.get('name')
        address = request.form.get('address')
        amount = request.form.get('amount')
        email = request.form.get('email')
        phone = request.form.get('phone')

        # Server-side validation
        if not name or len(name) < 2:
            flash('Nama wajib diisi (minimal 2 karakter).', 'error')
        elif not address or len(address) < 5:
            flash('Alamat wajib diisi (minimal 5 karakter).', 'error')
        elif not amount or float(amount) <= 0:
            flash('Jumlah zakat harus angka positif.', 'error')
        else:
            new_payer = Payer(
                name=name, 
                address=address, 
                amount=float(amount),
                email=email if email else None,
                phone=phone if phone else None
            )
            db.session.add(new_payer)
            db.session.commit()
            flash(f'Pembayar "{name}" telah berhasil ditambahkan.', 'success')
        
        return redirect(url_for('index'))

    @app.route('/payers/edit/<int:id>', methods=['POST'])
    def edit_payer(id):
        payer = db.get_or_404(Payer, id)
        name = request.form.get('name')
        address = request.form.get('address')
        amount = request.form.get('amount')
        email = request.form.get('email')
        phone = request.form.get('phone')

        # Server-side validation
        if not name or len(name) < 2:
            flash('Nama wajib diisi (minimal 2 karakter).', 'error')
        elif not address or len(address) < 5:
            flash('Alamat wajib diisi (minimal 5 karakter).', 'error')
        elif not amount or float(amount) <= 0:
            flash('Jumlah zakat harus angka positif.', 'error')
        else:
            payer.name = name
            payer.address = address
            payer.amount = float(amount)
            payer.email = email if email else None
            payer.phone = phone if phone else None
            db.session.commit()
            flash(f'Informasi pembayar "{name}" telah berhasil diperbarui.', 'success')

        return redirect(url_for('index'))

    @app.route('/payers/delete/<int:id>', methods=['POST'])
    def delete_payer(id):
        payer = db.get_or_404(Payer, id)
        payer_name = payer.name
        db.session.delete(payer)
        db.session.commit()
        flash(f'Informasi pembayar "{payer_name}" telah berhasil dihapus.', 'destructive')
        return redirect(url_for('index'))

    # Command to initialize the database
    @app.cli.command('init-db')
    def init_db_command():
        """Creates the database tables."""
        with app.app_context():
            db.create_all()
        click.echo('Initialized the database.')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) 
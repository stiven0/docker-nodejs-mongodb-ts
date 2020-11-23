import { Request, Response, Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', (req: Request, res: Response) => {

    return res.status(200).json({
        ok: true,
        message: 'Hello world!!!'
    });

});

router.post('/user', async (req: Request, res: Response) => {

    const { name, email } = req.body;

    const user = new User({
        name,
        email
    });

    try {

        const userDB = await user.save();

        if ( userDB ) {
            return res.status(201).json({
                ok: true,
                user: userDB
            });

        }

        return res.status(400).json({
            ok: false,
            message: 'Ha ocurrido un error, no fue posible guardar el usuario'
        });

    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: err
        });
    }

});

router.put('/user/:id', async (req: Request, res: Response) => {

    const { id } = req.params;
    const { name } = req.body;

    try {

        const userDB = await User.findOneAndUpdate({ _id: id }, { name }, { new: true, runValidators: true });

        if ( userDB ) {
               return res.status(201).json({
                    ok: true,
                    userUpdate: userDB
               });

        }

        return res.status(400).json({
            ok: false,
            message: 'Ha ocurrido un error, no fue posible realizar la actualizacion'
        });
        
    } catch (err) {

        return res.status(500).json({
            ok: false,
            message: err
        });
        
    }

});

router.delete('/user/:id', async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const userDB = await User.findOneAndDelete( { _id: id } );

        if ( userDB ) {
                return res.status(200).json({
                    ok: true,
                    userDeleted: userDB
                });
        }

        return res.status(400).json({
            ok: false,
            message: 'Ha ocurrido un error, no fue posible realizar la eliminacion'
        });
        
    } catch (err) {
        
        return res.status(500).json({
            ok: false,
            message: err
        });

    }

});

router.get('/users', async (req: Request, res: Response) => {

    try {

        const usersDB = await User.find();

        if ( usersDB && usersDB.length > 0 ) {
                return res.status(200).json({
                    ok: true,
                    users: usersDB
                });
        }

        else if ( usersDB && usersDB.length === 0 ) {

            return res.status(404).json({
                ok: false,
                message: 'No hay usuarios que enlistar'
            });

        } else {

            return res.status(400).json({
                ok: false,
                message: 'Ha ocurrido un error, intetalo de nuevo mas tarde'
            });

        }

        
    } catch (err) {

        return res.status(400).json({
            ok: false,
            message: err
        });
        
    }

});

export default router;
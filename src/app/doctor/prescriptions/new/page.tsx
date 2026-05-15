'use client';

import {
    useEffect,
    useState,
} from 'react';

import { useRouter } from 'next/navigation';

import {
    useFieldArray,
    useForm,
} from 'react-hook-form';

import { toast } from 'sonner';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';

import {
    Card,
    CardContent,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { Textarea } from '@/components/ui/textarea';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { useAuthStore } from '@/store/auth.store';

import {
    createPrescription,
    getPatients,
} from '@/services/prescriptions.service';

import {
    CreatePrescriptionDto,
    Patient,
} from '@/types/prescription.types';

export default function NewPrescriptionPage() {
    const router = useRouter();

    const { accessToken } = useAuthStore();

    useProtectedRoute(['doctor']);

    const [loading, setLoading] = useState(false);

    const [patients, setPatients] = useState<Patient[]>([]);

    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreatePrescriptionDto>({
        defaultValues: {
            patientId: '',
            notes: '',
            items: [
                {
                    name: '',
                    dosage: '',
                    quantity: 1,
                    instructions: '',
                },
            ],
        },
    });

    const selectedPatient = watch('patientId');

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'items',
    });

    useEffect(() => {
        register('patientId', { required: true });
    }, [register]);

    async function loadPatients() {
        try {
            if (!accessToken) return;

            const data = await getPatients(accessToken);

            setPatients(data);
        } catch {
            toast.error('Error cargando pacientes');
        }
    }

    useEffect(() => {
        loadPatients();
    }, []);

    async function onSubmit(data: CreatePrescriptionDto) {
        try {
            if (!accessToken) return;

            if (!data.patientId) {
                toast.error('Debe seleccionar un paciente');
                return;
            }

            if (data.items.length === 0) {
                toast.error('Debe agregar al menos un medicamento');
                return;
            }

            setLoading(true);

            await createPrescription(accessToken, data);

            toast.success('Prescripción creada');

            router.push('/doctor/prescriptions');
        } catch {
            toast.error('Error al crear prescripción');
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout title="Nueva Prescripción">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                    Crear Prescripción
                </h2>

                <p className="mt-1 text-slate-500">
                    Registrar nueva receta médica
                </p>
            </div>

            <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {/* PATIENT */}

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Paciente
                            </label>

                            <Select
                                onValueChange={(value) =>
                                    setValue('patientId', value, {
                                        shouldValidate: true,
                                    })
                                }
                            >
                                <SelectTrigger
                                    className={`h-11 ${
                                        errors.patientId
                                            ? 'border-red-500 focus:ring-red-500'
                                            : ''
                                    }`}
                                >
                                    <SelectValue placeholder="Seleccionar paciente" />
                                </SelectTrigger>

                                <SelectContent>
                                    {patients.map((patient) => (
                                        <SelectItem
                                            key={patient.id}
                                            value={patient.id}
                                            className="py-3"
                                        >
                                            <span className="font-medium">
                                                {patient.name}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.patientId && !selectedPatient && (
                                <p className="mt-1 text-sm text-red-500">
                                    Debe seleccionar un paciente
                                </p>
                            )}

                            {!patients.length && (
                                <p className="mt-2 text-sm text-red-500">
                                    No hay pacientes disponibles
                                </p>
                            )}
                        </div>

                        {/* NOTES */}

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Notas
                            </label>

                            <Textarea
                                placeholder="Notas médicas"
                                className="min-h-[120px]"
                                {...register('notes')}
                            />
                        </div>

                        {/* ITEMS */}

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Medicamentos
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Agrega uno o más medicamentos
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        append({
                                            name: '',
                                            dosage: '',
                                            quantity: 1,
                                            instructions: '',
                                        })
                                    }
                                >
                                    Agregar
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <Card
                                    key={field.id}
                                    className="border border-slate-200 shadow-none"
                                >
                                    <CardContent className="space-y-4 p-6">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {/* MEDICAMENTO */}
                                            <div>
                                                <Input
                                                    placeholder="Medicamento"
                                                    {...register(
                                                        `items.${index}.name`,
                                                        {
                                                            required:
                                                                'Medicamento requerido',
                                                        },
                                                    )}
                                                />
                                                {errors.items?.[index]?.name && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.items[index]?.name?.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* DOSIS */}
                                            <div>
                                                <Input
                                                    placeholder="Dosis"
                                                    {...register(
                                                        `items.${index}.dosage`,
                                                        {
                                                            required:
                                                                'La dosis es obligatoria',
                                                        },
                                                    )}
                                                />
                                                {errors.items?.[index]?.dosage && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.items[index]?.dosage?.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* CANTIDAD */}
                                            <div>
                                                <Input
                                                    type="number"
                                                    placeholder="Cantidad"
                                                    {...register(
                                                        `items.${index}.quantity`,
                                                        {
                                                            valueAsNumber: true,
                                                            required: 'Cantidad requerida',
                                                            min: {
                                                                value: 1,
                                                                message: 'Debe ser mayor a 0',
                                                            },
                                                        },
                                                    )}
                                                />
                                                {errors.items?.[index]?.quantity && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.items[index]?.quantity?.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* INSTRUCCIONES */}
                                            <div>
                                                <Input
                                                    placeholder="Indicaciones"
                                                    {...register(
                                                        `items.${index}.instructions`,
                                                        {
                                                            required:
                                                                'Las indicaciones son obligatorias',
                                                        },
                                                    )}
                                                />
                                                {errors.items?.[index]?.instructions && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.items[index]?.instructions?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* REMOVE */}
                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => remove(index)}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* SUBMIT */}

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-11 px-8"
                            >
                                {loading ? 'Creando...' : 'Crear Prescripción'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
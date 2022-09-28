<?php

namespace App\Http\Controllers;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Thread\GetPaginatedRequest;
use App\Http\Requests\Thread\ToggleLockedRequest;
use App\Http\Requests\Thread\TogglePinnedRequest;
use App\Http\Requests\Thread\MarkAsReadRequest;
use App\Http\Requests\Thread\IndexRequest;
use App\Http\Requests\Thread\StoreRequest;
use App\Http\Requests\Thread\ShowRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ReactionResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\ThreadResource;
use App\Models\Category;
use App\Models\Reaction;
use App\Models\Thread;

class ThreadController extends Controller {
    /**
     * Return the create profile page.
     *
     * @param IndexRequest $request
     * 
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Authed/Thread/Create/index', [
            'categories' => CategoryResource::collection(Category::assignableByUser()),
        ]);
    }

    /**
     * Store a new thread.
     *
     * @param StoreRequest
     * 
     * @return RedirectResponse
     */
    public function store(StoreRequest $request): RedirectResponse {
        return redirect()->route('thread.show', ['thread' => $request->createThread()->id]);
    }

    /**
     * Return the requested thread.
     *
     * @param ShowRequest $request
     * @param Thread $thread
     * @param ?string $page
     * 
     * @return Response
     */
    public function show(ShowRequest $request, Thread $thread, ?string $page = '1'): Response {
        return Inertia::render('Authed/Thread/View/index', [
            'comments' => CommentResource::collection($thread->comments()->orderBy('id')->paginate(Thread::COMMENTS_PER_PAGE, page: $page)),
            'reactions' => ReactionResource::collection(Reaction::all()),
            'thread' => ThreadResource::make($thread),
        ]);
    }

    /**
     * Get a paginated collection of threads.
     * 
     * @param GetPaginatedRequest $request
     * 
     * @return AnonymousResourceCollection
     */
    public function getPaginated(GetPaginatedRequest $request): AnonymousResourceCollection {
        return ThreadResource::collection(
            Thread::getFiltered(
                $request->get('filter'),
                $request->get('search')
            )->with('comments')->paginate(Thread::THREADS_PER_PAGE)
        );
    }

    /**
     * Mark all of the requested thread's comments as read.
     *
     * @param MarkAsReadRequest $request
     * @param Thread $thread
     * 
     * @return void
     */
    public function markAsRead(MarkAsReadRequest $request, Thread $thread): void {
        abort_unless($thread->isUnread(), 422, 'Thread is already read!');

        DB::transaction(function () use ($thread) {
            $thread->comments->each(fn ($comment) => $comment->markAsRead());
        });
    }

    /**
     * Toggle the lock status of this thread.
     * 
     * @param ToggleLockedRequest
     * @param Thread $thread
     * 
     * @return void
     */
    public function toggleLocked(ToggleLockedRequest $request, Thread $thread): void {
        $thread->forceFill(['is_locked' => !$thread->is_locked]);

        $thread->update();
    }

    /**
     * Toggle the pinned status of this thread.
     * 
     * @param TogglePinnedRequest
     * @param Thread $thread
     * 
     * @return void
     */
    public function togglePinned(TogglePinnedRequest $request, Thread $thread): void {
        $thread->forceFill(['is_pinned' => !$thread->is_pinned]);

        $thread->update();
    }
}
